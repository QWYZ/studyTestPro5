import { Observable } from 'rxjs';
import {} from 'rxjs/operators';
import { message, notification } from 'antd';

let ws,
  count = 0, //计数
  timer = {};
const subs = {};
//获取token
const token = JSON.parse(localStorage.getItem('loginUserData'))?.token;
const host = 'demo.jetlinks.cn' || document.location.host;
/**初始化 */
const initWebSocket = () => {
  clearInterval(timer); //清除定时器
  const wsUrl = `ws://${host}/jetlinks/messaging/${token}?X_Access_Token=${token}`; //请求地址
  if (!ws && count < 5) {
    try {
      count = count + 1;
      ws = new WebSocket(wsUrl);
      ws.onclose = () => {
        ws = undefined;
        setTimeout(initWebSocket, 5000 * count);
      };
      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        if (data.type === 'authError') {
          message.error({ key: 'wserr1', content: data.message });
        }
        if (data.type === 'error') {
          message.error({ key: 'wserr', content: data.message });
        }
        if (subs[data.requestId]) {
          if (data.type === 'complete') {
            subs[data.requestId].forEach((element) => {
              element.complete();
            });
          } else if (data.type === 'result') {
            subs[data.requestId].forEach((element) => {
              element.next(data);
            });
          }
        }
      };
    } catch (error) {
      //等待几秒，重新初始化
      setTimeout(initWebSocket, 5000 * count);
    }
  }

  timer = setInterval(() => {
    try {
      ws?.send(JSON.stringify({ type: 'putong' }));
    } catch (error) {
      console.error(error, '发送心跳错误');
    }
  }, 2000);

  return ws;
};

/**
 *
 * @param {string} id
 * @param {string} topic
 * @param {any} parameter
 * @returns
 */
const getWebsocket = (id, topic, parameter) =>
  new Observable((subscriber) => {
    if (!subs[id]) {
      subs[id] = [];
    }
    subs[id].push({
      next: (val) => {
        subscriber.next(val);
      },
      complete: () => {
        subscriber.complete();
      },
    });
    const msg = JSON.stringify({ id, topic, parameter, type: 'sub' });
    const thisWs = initWebSocket();
    const tempQueue = [];

    if (thisWs) {
      try {
        if (thisWs.readyState === 1) {
          thisWs.send(msg);
        } else {
          tempQueue.push(msg);
        }

        if (tempQueue.length > 0 && thisWs.readyState === 1) {
          tempQueue.forEach((i, index) => {
            thisWs.send(i);
            tempQueue.splice(index, 1);
          });
        }
      } catch (error) {
        initWebSocket();
        message.error({ key: 'ws', content: 'websocket服务连接失败' });
      }
    }

    return () => {
      const unsub = JSON.stringify({ id, type: 'unsub' });
      delete subs[id];
      if (thisWs) {
        thisWs.send(unsub);
      }
    };
  });

export { getWebsocket, initWebSocket };
