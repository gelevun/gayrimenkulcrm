import { useToast } from "@/components/ui/use-toast";

export const useAppToast = () => {
  const { toast } = useToast();

  return {
    success: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default",
        className: "border-green-200 bg-green-50 text-green-800",
      });
    },
    error: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "destructive",
      });
    },
    warning: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default",
        className: "border-yellow-200 bg-yellow-50 text-yellow-800",
      });
    },
    info: (title: string, description?: string) => {
      toast({
        title,
        description,
        variant: "default",
        className: "border-blue-200 bg-blue-50 text-blue-800",
      });
    },
  };
};