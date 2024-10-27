export default class ModuleAssessment {
  name;
  config;

  constructor(name) {
    this.name = name.trim();
    return this;
  }

  load_config(config_path) {
    return this;
  }

  run() {
    return this;
  }
}
