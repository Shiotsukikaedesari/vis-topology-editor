export const getComponentPropStructure = function (component) {
  const structure = {};

  const getPropStructure = (props) => {
    Object.keys(props).forEach((key) => {
      if (props[key].default) {
        structure[key] =
          typeof props[key].default === "function" ? props[key].default() : props[key].default;
      }
    });
  };

  if (component.mixins && component.mixins.length) {
    component.mixins.forEach((mixins) => {
      if (mixins.props) {
        getPropStructure(mixins.props);
      }
    });
  }

  component.props && getPropStructure(component.props);

  // 组件名
  if (component.name) {
    structure.component = component.name;
  } else {
    // if (!component.__file) {
    console.error("component must hava a name");
    //   return {};
    // }
    // const file = component.__file;
    // structure.component = file.split("/").pop().split(".").shift();
  }

  return structure;
};
