import React, { Fragment } from 'react';
import { motion } from 'framer-motion'

const classes = {
    bar: {
        position: "relative",
    },
    container: {
        width: "100%",
        display: "flex",
        position: "absolute",
    }
}

function Bar(props) {
  const barDefaultStyle = {
    // transition: `all ${props.timeout}ms ease-in-out`,
    ...props.prevStyle,
  };
  // const posDefaultStyle = {
  //   transition: `all ${props.timeout}ms ease-in-out`,
  //   marginTop: props.prevStyle.marginTop,
  // }
  const barTransitionStyles = {
    initial: props.prevStyle,
    animate:  props.currStyle,
  };
  const posTransitionStyles = {
    initial: { marginTop: props.prevStyle.marginTop },
    animate: { marginTop: props.currStyle.marginTop },
    transition: {
      ease: 'easeOut',
      duration: 1.25
    }
  }
  return (
      <div style={classes.container}>
        <motion.div>
          <Fragment>
            <motion.div
              animate={{
                width: `${props.width[0]}%`
              }}
              transition={{
                ease: 'easeOut',
                duration: 1.25
              }}
            >
              {props.label}
            </motion.div>
            <motion.div
              animate={{
                width: `${props.width[1]}%`
              }}
              transition={{
                ease: 'easeOut',
                duration: 1.25
              }}
            >
              <motion.div
                style={{
                  ...classes.bar,
                }}/>
            </motion.div>
            <motion.div
              animate={{
                width: `${props.width[2]}%`
              }}
              transition={{
                ease: 'easeOut',
                duration: 1.25
              }}
            >
              <div style={{...props.textBoxStyle}}>
                {props.value}
              </div>
            </motion.div>
          </Fragment>
        </motion.div>
      </div>
    );
}

export default Bar;
