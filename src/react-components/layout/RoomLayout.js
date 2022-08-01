import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './RoomLayout.scss'
import { Toolbar } from './Toolbar'
import RoomOverlay from '../../../strata/ui/room-overlay'

export function RoomLayout({
  className,
  viewportClassName,
  sidebar,
  sidebarClassName,
  toolbarLeft,
  toolbarCenter,
  toolbarRight,
  toolbarClassName,
  modal,
  scene,
  viewport,
  objectFocused,
  streaming,
  viewportRef,
  ...rest
}) {
  return (
    <div className={classNames(styles.roomLayout, { [styles.objectFocused]: objectFocused }, className)} {...rest}>
      <RoomOverlay scene={scene} />
      {sidebar && <div className={classNames(styles.sidebar, sidebarClassName)}>{sidebar}</div>}
      <div className={classNames(styles.modalContainer, styles.viewport)}>{modal}</div>
      {(toolbarLeft || toolbarCenter || toolbarRight) && (
        <Toolbar
          className={classNames(styles.main, styles.toolbar, toolbarClassName)}
          left={toolbarLeft}
          center={toolbarCenter}
          right={toolbarRight}
        />
      )}
      <div
        className={classNames(styles.main, styles.viewport, { [styles.streaming]: streaming }, viewportClassName)}
        ref={viewportRef}
      >
        {viewport}
      </div>
    </div>
  )
}

RoomLayout.propTypes = {
  className: PropTypes.string,
  viewportClassName: PropTypes.string,
  sidebar: PropTypes.node,
  sidebarClassName: PropTypes.string,
  toolbarLeft: PropTypes.node,
  toolbarCenter: PropTypes.node,
  toolbarRight: PropTypes.node,
  scene: PropTypes.object,
  toolbarClassName: PropTypes.string,
  modal: PropTypes.node,
  viewport: PropTypes.node,
  objectFocused: PropTypes.bool,
  streaming: PropTypes.bool,
  viewportRef: PropTypes.any
}
