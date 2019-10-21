import React from 'react';
import { Transition } from 'react-transition-group'

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
        transition: `all ${props.timeout}ms ease-in-out`,
        ...props.prevStyle,
      };
      const posDefaultStyle = {
        transition: `all ${props.timeout}ms ease-in-out`,
        marginTop: props.prevStyle.marginTop,
      }
      const barTransitionStyles = {
          entering: props.prevStyle,
          entered:  props.currStyle,
          exiting: props.currStyle,
      };
      const posTransitionStyles = {
          entering: {marginTop: props.prevStyle.marginTop},
          entered: {marginTop: props.currStyle.marginTop},
          exiting: {marginTop: props.currStyle.marginTop},
      }
      return (
          <div style={classes.container}>
            <Transition in={true} timeout={props.timeout}>
                { 
                state => (
                <React.Fragment>
                <div style={{
                    ...posDefaultStyle, 
                    ...posTransitionStyles[state],
                    width: `${props.width[0]}%`
                }}>
                    {props.label}
                </div>
                <div style={{width: `${props.width[1]}%`}}>
                    <div
                        style={{
                            ...classes.bar, 
                            ...barDefaultStyle, 
                            ...barTransitionStyles[state]}} 
                    />
                </div>
                <div style={{
                    ...posDefaultStyle, 
                    ...posTransitionStyles[state],
                    width: `${props.width[2]}%`
                }}>
                    <div style={{...props.textBoxStyle}}>
                        {props.value}
                    </div>
                </div>
                </React.Fragment>)
                }
            </Transition>
          </div>
        );
}

export default Bar;