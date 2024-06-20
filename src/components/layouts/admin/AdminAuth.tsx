import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userAdminAuth,
  userAdminIsLogin,
} from '~/store/reducers/adminAuthSlice';
import { RootState } from '~/store/store';

const protectedRoutes = ['/admin/login', '/admin/register'];

export default function AdminAuth({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const router = useRouter();
  const { isLogin } = useSelector((state: RootState) => state.adminAuth);

  return (
    <>
      {!isLogin ? (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-white text-xl font-semibold">Loading...</h2>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
