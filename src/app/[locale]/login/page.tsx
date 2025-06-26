import { useTranslations, useLocale } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";
import { LoginForm } from "@/components/auth";

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div
          className={`flex items-center justify-center mb-8 ${
            isRTL ? "space-x-reverse space-x-2" : "space-x-2"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600">
            <Package className="h-7 w-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            SaaSHub
          </span>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader
            className={`space-y-1 ${isRTL ? "text-right" : "text-left"}`}
          >
            <CardTitle className="text-2xl font-bold text-center">
              {t("auth.login.title")}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t("auth.login.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
