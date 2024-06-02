import storage from '../utils/storage';

export const logout = () => storage.remove({key: 'user'});
