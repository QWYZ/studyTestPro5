import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Modal } from 'antd';
import { Map } from 'react-amap';

/**
 * 基于高德地图和antd的获取坐标的模态框组件
 * @description 通过选择或者输入地理位置获取位置坐标的组件
 * @example
 * @author 千万样子
 */
const Location = (props) => {

  const {
    visible,
    close,
    save
  } = props;

  const [form] = Form.useForm();//表单
  //初始化表单数据
  const [formVals, setFormVals] = useState({
    coordinates: props?.location || null,
    search: props?.search || null,
  });

  const [mapCreated, setMapCreated] = useState({});
  const [mapMarker, setMapMarker] = useState({});


  const onValidateForm = async () => {
    form.validateFields().then((values) => {
      let revalues = values
      // console.log(revalues);
      save(revalues);
    }).catch((info) => {

    });
  };

  const newMassMarks = (map, keywords) => {
    window.AMap.plugin('AMap.PlaceSearch', function () {
      let autoOptions = {
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: '全国', // 兴趣点城市
        map: map, // 展现结果的地图实例
        autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      };
      let placeSearch = new AMap.PlaceSearch(autoOptions);
      placeSearch.search(keywords, function (status, result) {
      });
    });
  };

  // map事件列表
  const mapEvents = {
    created: (ins) => {
      setMapCreated(ins);
      // console.log('map事件列表1', props.location);
      if (props.location) {
        newMarker(ins, props.location.split(','));
      }
    },
    click: (ins) => {
      // console.log('地图点击click', ins, form.getFieldsValue());
      form.setFieldsValue({
        coordinates: ins.lnglat.getLng() + ',' + ins.lnglat.getLat()
      });
      if (mapCreated.getAllOverlays('marker').length <= 0) {
        newMarker(mapCreated, [ins.lnglat.getLng(), ins.lnglat.getLat()]);
      } else {
        if (Object.keys(mapMarker).length === 0) {
          newMarker(mapCreated, [ins.lnglat.getLng(), ins.lnglat.getLat()])
        } else {
          mapMarker.setPosition([ins.lnglat.getLng(), ins.lnglat.getLat()]);
        }
      }
    },
  };

  const newMarker = (map, coordinate) => {
    let marker = new window.AMap.Marker({
      offset: new window.AMap.Pixel(-10, -30),
    });
    marker.setMap(map);
    setMapMarker(marker);
    upMarker(marker, coordinate);
  };

  const upMarker = (map, coordinate) => {
    map.setPosition(coordinate);
  };

  return (
    <Modal
      title='选择定位'
      visible={visible}
      okText="确定"
      cancelText="取消"
      onOk={() => {
        onValidateForm();
      }}
      width="60vw"
      onCancel={() => props.close()}
    >
      <div style={{ width: '100%', height: '50vh' }}>
        <Map resizeEnable events={mapEvents} rotateEnable={true} />
        <div
          style={{
            width: '35%',
            height: '150px',
            float: 'right',
            marginTop: '-50vh',
            paddingTop: 5,
            paddingRight: 5,
          }}
        >
          <Card
            bordered={false}
            style={{
              height: '150px',
              marginTop: 5,
            }}
          >
            <Form
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              form={form}
              initialValues={{
                search: formVals?.search,
                coordinates: formVals?.coordinates,
              }}
            >
              <Form.Item
                name="search"
                label="位置搜索"
                style={{ marginBottom: 14 }}
              >
                <Input.Search
                  placeholder="输入搜索区域"
                  onSearch={value => {
                    newMassMarks(mapCreated, value);
                  }}
                  enterButton
                />
              </Form.Item>
              <Form.Item
                name="coordinates"
                label="经纬度"
                style={{ marginBottom: 14 }}
              >
                <Input placeholder="鼠标点击地图获取" />
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>

    </Modal>
  );
}

export default Location
