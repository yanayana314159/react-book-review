// __mocks__/axios.js

const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  // 他の axios メソッドに関するモックも必要に応じて追加
};

export default axios;
