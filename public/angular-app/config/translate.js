module.exports = ['$translateProvider',
    function($translateProvider) {

        $translateProvider.preferredLanguage('en');

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: ''
        });
    }
];