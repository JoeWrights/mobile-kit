import classNames from 'classnames';
import { useLiveDemo, useLocation } from 'dumi';
import PreviewerActions from 'dumi/theme/slots/PreviewerActions';
import React, { useRef } from 'react';
import './index.less';

const Previewer = (props: any) => {
  const demoContainer = useRef<HTMLDivElement | null>(null);
  const { hash } = useLocation();
  const link = `#${props.asset.id}`;

  const { node, error, loading, setSource } = useLiveDemo(props.asset.id, {
    iframe: Boolean(props.iframe || props._live_in_iframe),
    containerRef: demoContainer,
  });

  return (
    <div
      id={props.asset.id}
      className={classNames('dumi-default-previewer', 'mk-mobile-previewer', props.className)}
      style={props.style}
      data-debug={props.debug}
      data-active={hash === link || undefined}
    >
      <div
        className='dumi-default-previewer-demo'
        style={{ background: props.background }}
        data-compact={props.compact || undefined}
        data-transform={props.transform || undefined}
        data-iframe={props.iframe || undefined}
        data-error={Boolean(error) || undefined}
        data-loading={loading || undefined}
        ref={demoContainer}
      >
        {props.iframe ? (
          <iframe
            style={['string', 'number'].includes(typeof props.iframe) ? { height: Number(props.iframe) } : {}}
            src={props.demoUrl}
          />
        ) : (
          node || props.children
        )}
      </div>

      {error && (
        <div className='dumi-default-previewer-demo-error'>
          <span style={{ marginRight: 6 }}>!</span>
          {error.toString()}
        </div>
      )}

      <div className='dumi-default-previewer-meta'>
        {(props.title || props.debug) && (
          <div className='dumi-default-previewer-desc'>
            <h5>
              <a href={link}>
                {props.debug && <strong>DEV ONLY</strong>}
                {props.title}
              </a>
            </h5>
            {props.description && <div className='markdown' dangerouslySetInnerHTML={{ __html: props.description }} />}
          </div>
        )}

        <PreviewerActions
          {...props}
          forceShowCode
          onSourceChange={setSource}
          demoContainer={props.iframe ? demoContainer.current?.firstElementChild : demoContainer.current}
        />
      </div>
    </div>
  );
};

export default Previewer;
