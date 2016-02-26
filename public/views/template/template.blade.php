<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>LotteryClick</title>
    <meta name="description" content="daddas">
    <link rel="icon" type="image/png" href="images/fav.png" />
    <!-- styles -->
   <!--  <link rel="stylesheet" href=[[asset('vendor/foundation.min.css')]]> -->
    <link rel="stylesheet" href="styles/bootstrap.min.css">
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,500,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/ui-darkness/jquery-ui.min.css" />

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/animate.css/3.1.0/animate.min.css">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href=[[asset('vendor/fancybox/jquery.fancybox.css')]]>
        <link rel="stylesheet" href=[[asset('styles/dd.css')]]>

         <link rel="stylesheet" href=
                [[asset('styles/css/main.css')]]>

        @if(Session::has('operatorId'))
           <!--  <link rel="stylesheet" href=
                [[asset('styles/css/'.Session::get("operatorId") . '.css')]]> -->
        @endif
            <!-- endstyles-->
        </head>
        <body ng-app="lottery" data-ng-cloak id="ng-app">
            <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
            <!--[if lt IE 9]>
            <script src="/vendor/es5-shim/es5-shim.js"></script>
            <script src="/vendor/json3/lib/json3.min.js"></script>
            <![endif]-->
            @include('template.nav-bar')
                <div class="main-wrapper">
                    <div ui-view="" class="view"></div>
                </div>





            @include('template.footer')



        @if(Session::has('operatorId'))
        <script>
        var operator = [[[$operatorConfig]]],
            operatorConfig = operator.config;
        </script>
        @endif

        @if(Session::has('items'))
        <script>
            var items = [[[$items]]]
        </script>
        @endif

            @include('template.scripts')
        </body>
    </html>