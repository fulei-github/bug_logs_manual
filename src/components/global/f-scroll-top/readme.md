# 滚动到顶部

## 说明

scrollClass 为当前设置 overflow-y: scroll 的 dom 元素，要去里面需要有个元素包裹其他元素，示例：

```html
<!-- scrollClass为v-note-show -->
<div class="v-note-show">
  <!-- 这个firstChild div必须 -->
  <div class="note-child">
    <p>这里是100万字的很多文案</p>
  </div>
</div>
```

## Api

### Props

| 参数        | 说明                 | 类型   | 可选值 | 默认值 |
| ----------- | -------------------- | ------ | ------ | ------ |
| scrollClass | 设置滚动元素类(必须) | String | -      | -      |
