---
author: 王书硕
date: 2020-04-02T15:17:52+08:00
lastmod: 2020-04-02T15:17:52+08:00
toc: true
url: "/Refactoring-old-projects-part-1.html"
title: "重构旧项目-1"
summary: ""
categories:
- 折腾
---

## 背景
这个项目有点老旧
```
"dva": "2.1.0",
"react": "^16.2.0",
```
我打算用最新的react和@reduxjs/toolkit开始重构，旧的依赖只能使用connect方式来获取store，使用useSelector和useDispatch很方便也很易读。`@reduxjs/toolkit`提供的immer和actionCreater也很好用。

首先重构的是一个643行的组件，它的render方法有580行。

## 重复代码

很容易的发现了一大段重复代码
```jsx
<div className={styles.numbers_wrapper}>
  <span className={styles.number_item}>
      <span className={styles.number}>{detail.properties.member_count}</span>
      <span className={styles.text}>班级总人数</span>
  </span>
  <span className={styles.number_item}>
      <span className={styles.number}>{detail.properties.male_count}</span>
      <span className={styles.text}>男生人数</span>
  </span>
  <span className={styles.number_item}>
      <span className={styles.number}>{detail.properties.female_count}</span>
      <span className={styles.text}>女生人数</span>
  </span>
  <span className={styles.number_item}>
      <span className={styles.number}>{detail.properties.group_count &&( detail.properties.group_count[userDetail.detail.id] || 0)}</span>
      <span className={styles.text}>分组数</span>
  </span>
  <span className={styles.number_item}>
      <span className={styles.number}>{(detail.properties.user_lecture_count ? (detail.properties.user_lecture_count[userDetail.detail.id] || 0) : 0)}</span>
      <span className={styles.text}>授课次数</span>
  </span>
</div>
```
可以将他们组织成2个组件
```jsx
function NumberWithLabel({ label, count }) {
    return (
        <span className={styles.number_item}>
            <span className={styles.number}>{count}</span>
            <span className={styles.text}>{label}</span>
        </span>
    );
}
```
```jsx
<div className={styles.numbers_wrapper}>
    <NumberWithLabel label="班级总人数" count={member_count} />
    <NumberWithLabel label="男生人数" count={male_count} />
    <NumberWithLabel label="女生人数" count={female_count} />
    <NumberWithLabel label="分组数" count={group_count && (group_count[userId] || 0)} />
    <NumberWithLabel label="授课次数" count={(user_lecture_count ? (user_lecture_count[userId] || 0) : 0)} />
</div>
```
数据使用useSelector获取，这样代码看起来简单读了。

## 封装组件
然后发现了一大段代码可以封装成一个独立的组件。
```jsx
<div className={styles.card_body}>
{
    groupList && groupList.map((group, index) => (
        <div className={styles.group_item} key={index} onDrop={() => handleStudentDrop(group)} onDragOver={handleStudentDragOver}                                                >
            <div className={styles.group_item_header}>
                <span className={styles.group_item_info}>
                    {group.name}
                    <i className={styles.trophy_icon} />
                </span>
                <span className={styles.group_item_btns}>
                </span>
                <Radio className={styles.group_student_list_radio} checked={group.id === curGroup} onClick={() => selectCurGroup(group.id)} />
            </div>
            <div className={styles.group_student_list}>
                {
                    group.members && group.members.length === 0 ? (
                        <div style={{
                            textAlign:'center',
                            fontSize:14,
                            color:'#666',
                        }}>该小组没有学生</div>) : (
                        group.members.map((stu, i) => (<StudentItem
                            isDrage
                            key={i}
                            stu={stu}
                            group={group}
                            gender={stu.gender}
                            headimg_res_url={stu.headimg_res_url}
                            name={stu.name}
                            groupStuStyle
                            onDragStart={() => handleDragStart(stu, group.id)}
                            onSetLeader={e => handleSetLeader(e, stu,group)}
                            onSetHeader={e => handleSetHeader(e, stu)}
                        />))
                    )
                }
            </div>
        </div>
    ))
}
</div>
```
还有它相关的方法都是像这样的dispatch，大概有五六个，它们都写在render函数内，这非常糟糕。
```js
const handleDragStart = (stu, org_id) => {
    dispatch({
        type: 'classDetail/updateState',
        payload: {
            onDragStudent: {
                ...stu,
                org_id,
                type:!!org_id,
            },
        },
    });
};
```
我要讲这个`dispatch`中的`action`放到一个`action_creater.js`文件中，将组建放在`GroupItem.jsx`文件中。这可以让次要的信息不占用篇幅，主要的信息就会一目了然了。
这段代码就编程了2个组件和1个`action creater`文件。相关的代码封装在一起，再也不用为了看一个函数而滚动300行代码或者要用搜索才能找到了。
> 这3个文件目前都只有40-50行。


