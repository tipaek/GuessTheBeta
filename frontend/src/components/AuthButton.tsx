import { useGoogleLogin } from '@react-oauth/google';
import { useAppStore } from '../store/useAppStore';
import { authApi } from '../api/client';

export default function AuthButton() {
  const { user, setAuth, logout } = useAppStore();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const result = await authApi.loginWithGoogle(response.access_token);
        setAuth(result.user, result.token);
      } catch (err) {
        console.error('Login failed:', err);
      }
    },
    onError: () => console.error('Google login failed'),
  });

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {user.avatarUrl && (
          <img src={user.avatarUrl} alt="" className="w-7 h-7 rounded-full" />
        )}
        <button
          onClick={logout}
          className="text-xs text-white/50 hover:text-white/80"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="text-sm px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
    >
      Sign in
    </button>
  );
}
