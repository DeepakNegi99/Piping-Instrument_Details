/** @type {import('@craco/craco').CracoConfig} */
module.exports = {
  babel: {
    plugins: [
      [
        'import',
        { libraryName: 'antd', libraryDirectory: 'es', style: true },
        'antd'
      ]
    ]
  }
};
