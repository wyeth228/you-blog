module.exports = {
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
