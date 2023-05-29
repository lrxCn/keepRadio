const debounce =
  (fn, timeout = 1000, _timer) =>
  (...args) =>
    clearTimeout(
      _timer,
      (_timer = setTimeout(fn.bind(this, ...args), timeout))
    );

const keepRatio = (dom, config, debounceFn = debounce) => {
  const {
    width: initW,
    height: initH,
    duration = 200,
    debounceDuration = 500,
    isAuto = true,
  } = config || {
    duration: 200,
    debounceDuration: 500,
  };

  const setSize = () => {
    const { width, height } = dom.parentNode.getBoundingClientRect();
    const scale = Math.min(width / initW, height / initH);
    dom.style.transform = `translate(-50%, -50%) scale(${scale})`;
  };

  const init = () => {
    dom.parentNode.style.position = "relative";
    dom.style.position = "absolute";
    dom.style.left = "50%";
    dom.style.top = "50%";
    dom.style.transform = "translate(-50%, -50%) scale(0)";
    dom.style.aspectRatio = `${initW} / ${initH}`;
    dom.style.width = `${initW}px`;
    dom.style.height = `${initH}px`;
    setSize();
    dom.style.transition = `transform ease ${duration}ms`;
  };

  const onresize = debounceFn(setSize, debounceDuration);

  if (isAuto) {
    init();
    window.addEventListener('resize', onresize)
  }

  return {
    init,
    onresize,
  };
};
