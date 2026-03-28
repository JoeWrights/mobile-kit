import React, { useState } from 'react';
import { Button, Space } from 'antd-mobile';
import { Popup } from '@joewrights/mobile-kit';

type PopupPosition = 'left' | 'right' | 'top' | 'bottom';

export default () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<PopupPosition>('bottom');

  const open = (nextPosition: PopupPosition) => {
    setPosition(nextPosition);
    setVisible(true);
  };

  return (
    <>
      <Space wrap>
        <Button onClick={() => open('top')}>顶部弹出</Button>
        <Button onClick={() => open('bottom')}>底部弹出</Button>
        <Button onClick={() => open('left')}>左侧弹出</Button>
        <Button onClick={() => open('right')}>右侧弹出</Button>
      </Space>

      <Popup
        position={position}
        visible={visible}
        onMaskClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        bodyStyle={position === 'bottom' || position === 'top' ? { minHeight: '28vh' } : { width: '72vw' }}
      >
        <div style={{ padding: '20px 16px' }}>当前方向：{position}</div>
      </Popup>
    </>
  );
};
