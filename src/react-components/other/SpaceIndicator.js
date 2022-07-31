import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./SpaceIndicator.scss";
console.log(styles);
const SpaceIndicator = ({ scene }) => {
  const [state, setState] = useState({ show: false });

  const onEnter = useCallback(
    () => {
      setState({ show: true });
    },
    [setState]
  );

  const onLeave = useCallback(
    () => {
      setState({ show: false });
    },
    [setState]
  );

  useEffect(
    () => {
      scene.addEventListener("trigger:enter", onEnter);
      scene.addEventListener("trigger:leave", onLeave);

      return () => {
        scene.removeEventListener("trigger:enter", onEnter);
        scene.removeEventListener("trigger:leave", onLeave);
      };
    },
    [scene, onEnter, onLeave]
  );

  return (
    <div className={`${styles.spaceIndicator} ${state.show && styles.visible}`}>
      <p>
        <span>Whole</span>
        <br />
        <span>Picture</span>
      </p>
    </div>
  );
};

SpaceIndicator.propTypes = {
  scene: PropTypes.object
};

export default SpaceIndicator;
