module.exports = ['$provide',
    function($provide) {
        $provide.decorator('taOptions', ['$delegate',
            function(taOptions) {
                taOptions.toolbar = [
                    ['p', 'pre', 'quote'],
                    ['bold', 'italics',
                    'underline', 'ul', 'ol'
                    , 'redo', 'undo', 'clear'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight'],
                    ['insertLink']
                ];
                return taOptions;
            }])
        }];