
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
} from "../ui/card";

interface LoginFormProps {
  redirectUrl?: string | null;
  authError?: string | null;
  setAuthError?: (error: string | null) => void;
}


const loginSchema = z.object({
  email: z.string().email("Пожалуйста, введите корректный email адрес"),
  password: z.string().min(1, "Пароль обязателен"),
});


type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = ({ redirectUrl, authError, setAuthError }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      // Попытка предзаполнить email из localStorage для лучшего UX
      email: typeof window !== 'undefined' ? localStorage.getItem("lastEmail") || "" : "",
      password: "",
    }
  });
  
  const onSubmit = async (formData: LoginFormData) => {
    if (authError && setAuthError) {
      setAuthError(null);
    }
    
    // Очистка предыдущих ошибок логина
    setLoginError(null);
    setIsLoading(true);
    
    // Сохранение email для удобства
    if (typeof window !== 'undefined') {
      localStorage.setItem("lastEmail", formData.email);
    }
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      
      if (result?.ok) {
        const checkoutRedirect = typeof window !== 'undefined' ? localStorage.getItem("checkoutRedirect") : null;
        
        if (checkoutRedirect) {
          localStorage.removeItem("checkoutRedirect");
          router.push(checkoutRedirect);
        } else if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push("/");
        }
      } else {
        // Если логин не был успешным, ошибка будет показана через toast
        // но мы также установим ошибку формы для видимости
        setLoginError("Ошибка входа. Пожалуйста, проверьте ваши учетные данные и попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка формы логина:", error);
      setLoginError("Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-none shadow-none">
        <CardContent className="p-0 space-y-4">
          {(authError || loginError) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {authError || loginError}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message as string}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Пароль</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
              />
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleShowPassword}
                className="absolute right-0 top-0 h-full px-3"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message as string}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox 
              id="rememberMe" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)} 
            />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Запомнить меня
            </label>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Обработка...
              </div>
            ) : (
              "Войти"
            )}
          </Button>
          
          <div className="text-sm text-center mt-4 text-muted-foreground">
            <p>Проблемы со входом? Проверьте вашу почту для подтверждения.</p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default LoginForm;
