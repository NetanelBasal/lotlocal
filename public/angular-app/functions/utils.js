exports.closeModal = function(modalId) {
    $('#' + modalId).modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}