# node-express
一个简单的二手交易网站，基本的node +express +mongodb 开发模式流程

代码想要运行，
<h3>首先，</h3>安装node环境，及相关的模块：执行 npm install 安装程序所需的模块，
<ul>
<li>express框架，</li>
<li>express-session存储全局变量，</li>
  <li>connect-mongo session是存储在数据库中的，中间件，</li>
  <li>connect-flash 信息提示中间件，</li>
  <li>config-lite 配置文件，模块</li>
  ....
  </ul>
  <h3>then.</h3>
  <p>数据库mongodb，安装本地mongodb，在你的项目文件中创建mongo文件，
  将mongodb中的bin文件拷到mongo中，新建data文件夹
  </p>
  
  如何运行node ，express项目程序，自行百度。
  
  
  >**说明：程序为node入门级，通过此项目基本了解node，express开发框架和MongoDB数据库**
  
  
  <h3>不足与改进</h3>
  <ol>
 <li>数据库方面的不足，使用的是mongolass，数据的操作有欠缺</li>
 <li>直接服务器端渲染的页面，使用前框架，最近学习了angular，后面会写一个项目</li>
 <li>node服务器端程序很初级，耦合性高，代码重用率低，service服务来集成可用度高的方法，通过传参进行数据处理</li>
 <li>还有目前自己为接触到的问题，以及还没有熟悉了解的方面，web安全、jasmine调试、webpack打包</li>
   </ol>
   
   
   
