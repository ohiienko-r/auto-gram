import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { backButton } from "@tma.js/sdk-react";

interface UseBackButtonProps {
  visible?: boolean;
  customCallback?: () => void;
}

export default function useBackButton({
  visible = true,
  customCallback,
}: UseBackButtonProps = {}) {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    if (visible) {
      backButton.show();
    } else {
      backButton.hide();
    }

    return () => {
      backButton.hide();
    };
  }, [visible]);

  useEffect(() => {
    if (customCallback) {
      backButton.onClick(customCallback);
    } else {
      backButton.onClick(handleGoBack);
    }

    return () => {
      if (customCallback) {
        backButton.offClick(customCallback);
      } else {
        backButton.offClick(handleGoBack);
      }
    };
  }, [customCallback, handleGoBack]);
}
