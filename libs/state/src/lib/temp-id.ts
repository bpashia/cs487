import { useRecoilState } from 'recoil';
import { tempId } from './state.recoil';

export const useNewId = (): number => {
  const [newTempId, setTempId] = useRecoilState<number>(tempId);
  const newId = newTempId;
  setTempId(newTempId + 1);
  return newId;
};
