import Mock from "mockjs";
export default {
  getMenu: (config) => {
    //console.log(config, "permission");
    const { username, password } = JSON.parse(config.body);
    //console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    //if (username === "admin" || username === "wp") {
    // 判断账号和密码是否对应
    if (username === "admin" && password === "123456") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home/Home",
            },
            // {
            //   path: "/video",
            //   name: "video",
            //   label: "视频管理页",
            //   icon: "video-play",
            //   url: "video/video",
            // },
            {
              path: "/user",
              name: "user",
              label: "用户管理页",
              icon: "user",
              url: "user/user",
            },
            {
              label: "放个小动画",
              icon: "location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "彩色球",
                  icon: "setting",
                  url: "other/component/page1",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "跳动音符",
                  icon: "setting",
                  url: "other/component/page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      //if (username === "wp" && password === "123456")
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "Home/Home",
            },
            // {
            //   path: "/video",
            //   name: "video",
            //   label: "视频管理页",
            //   icon: "video-play",
            //   url: "video/video",
            // },
            {
              label: "放个小动画",
              icon: "location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "彩色球",
                  icon: "setting",
                  url: "other/component/page1",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "跳动音符",
                  icon: "setting",
                  url: "other/component/page2",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    }
  },
};
//     else {
//       return {
//         code: -999,
//         data: {
//           message: "密码错误",
//         },
//       };
//     }
//   } else {
//     return {
//       code: -999,
//       data: {
//         message: "用户不存在",
//       },
//     };
//   }
// },
