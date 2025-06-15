export default {
  spec_dir: "dist/tests",
  spec_files: ["**/*.[tT]est.?(m)js"],
  helpers: ["helpers/**/*.?(m)js"],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
    forbidDuplicateNames: true,
  },
};
