
<div id="secure">
  <img src="images/secure.png" alt="lotteryClick">
</div>
<nav ng-controller="navController">
  <div class="wrap"><a ui-sref="home"><img src="img/nav/logo.png" class="logo"/></a>
    <ul class="list-unstyled list-inline top">
      <li class="play"><img src="img/nav/playArrow.png"/><a ui-sref="playLotteries.Index">Play</a>
        <div>
            <table>
              <tr ng-repeat="lot in lotteries" ui-sref="one-lot-play.Personal({lotName: lot.name})">
                  <td class="country"><img ng-src="images/flags/{{lot.lottery.originCountry}}.png" alt="{{lot.originCountry}}" style="width: 30px;"><a>{{lot.lottery.originCountry.toUpperCase()}}</a></td>
                  <td><a href="" class="name">{{lot.lottery.name}}</a></td>
                  <td><a href=""><span ng-bind-html="lot.lottery.currency | moneyType"></span><span>{{lot.lottery.jackpotAmount | number:0}}</span></a></td>
                  <td> <a ui-sref="one-lot-play.Personal({lotName: lot.name})" class="btn btn-xs primary-btn" translate="Play"></a></td>
              </tr>
          </table>
          <p><a ui-sref="playLotteries.Index" class="link">View all lotteries</a></p>
        </div>
      </li><!-- end play -->
      <li><a ui-sref="latest-results">Results & info</a></li>
<!--
      <li ng-if="userService.user.type == 'operator'"><a ui-sref="operatorDash.langs">Dashboard
        <ul class="list-unstyled">
          <li><a ui-sref="operatorDash.langs">Config</a></li>
          <li><a ui-sref="promosPanel">Promos</a></li>
        </ul>
      </a></li> --><!-- end dashboard -->
      <li ng-if="userService.user && userService.user.type !== 'admin'">
        <a ui-sref="account.personalInfo">My account</a>
      </li><!-- end account -->


      <li ui-sref="contact-us"><img src="img/nav/green.png" alt="lotteryClick"/> Support</li>
<li class="diff-link langs" ng-if="userService.user.type == 'admin'"><a>Admin</a>
         <div>
            <table>
                <tr>
                <td>
                  <a ui-sref="admin">Admin Panel</a>
                </td>
                </tr>
               <!--   <tr>
                <td>
                  <a ui-sref="contacts-list">Contacts</a>
                </td>
                </tr> -->
            </table>
          </div>
        <img src="images/nav/arrow-down.png" alt="lotteryClick">
        </li><!-- end langs -->
      <li class="diff-link langs"><a><img ng-src="images/lang/{{currentLang}}.png" alt="{{currentLang}}"> | {{currentLang}}</a>
     <!--     <div>
            <table>
                <tr ng-repeat="lang in operatorConfig.langs">
                <td><a ng-click="changeLanguage(lang.id)">
                  <img ng-src="images/lang/{{lang.id}}.png" alt="English">{{lang.name}}</a>
                </td>
                </tr>
            </table>
          </div> -->
       <!--  <img src="images/nav/arrow-down.png" alt="lotteryClick"> -->
        </li><!-- end langs -->
      <li class="diff-link">Share <img src="img/share.png" alt="lotteryClick"></li>
    </ul>
  </div>
</nav>
<div class="auth clearfix" ng-controller="navController">
  <div class="wrap">
    <ul class="list-unstyled list-inline">
    <li ng-click="openLogin()" ng-if="!userService.user"><a>Sign-in</a></li>
    <li ng-if="!userService.user">|</li>
    <li ng-if="!userService.user"><a ng-click="openSignup()">Sign-up</a></li>
    <li ng-if="userService.user"><span>Welcome {{userService.user.userName}}!</span></li>
    <li ng-if="userService.user" ng-click="logOut()"><a>Log out</a></li>
  </ul>
  </div>
</div>

  <div class="cart-img at-nav" ng-controller="myCartController">
        <span>{{cartLen}}</span>
        <a ui-sref="cart.auth"><img src="images/cart.png" alt="cart"></a>
  </div>   <!-- end cart img -->

<!-- <li ng-if="userService.user.type == 'admin'"><a>Operator</a>
<ul>
    <li><a href="?operatorId=11">Lottery Click</a></li>
    <li><a href="?operatorId=20">Lottery Boom</a></li>
    <li><a href="?operatorId=22">Lottery Cool</a></li>
</ul>
</li>
<li ng-if="userService.user.type == 'admin'">
<a ui-sref="admin">Admin Panel</a>
</li> -->