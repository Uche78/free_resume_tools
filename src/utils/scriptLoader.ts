// Dynamic script loading function
export const loadScript = (src: string, async = true): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
};