import { useAppSelector } from './redux';

const useAuth = () => {
    const { email, role} = useAppSelector(
        (state) => state.userReducer
      );
    
      return {
        isAuth: !!email,
        isAdmin: role === 'ADMIN'
      };
}

export default useAuth