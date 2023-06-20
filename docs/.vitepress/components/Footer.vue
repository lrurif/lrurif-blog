<!-- docs/.vitepress/components/Footer.vue -->

<template>
    <footer class="custom-footer">
      <div class="links">
            <div class="tips">如有转载或 CV 的请标注本站原文地址</div>
            <a target="_blank" href="https://beian.miit.gov.cn">网站备案: 浙ICP备2022037674号</a>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .custom-footer {
    font-size: 14px;
    padding: 15px;
    text-align: center;
    color: var(--vp-c-text-1);
  }
  
  .custom-footer .links a {
    margin-right: 10px;
  }
  .custom-footer .links a:hover {
    text-decoration: underline;
  }
  .links .tips {
    color: rgb(122 122 122);
  }

  </style>
  