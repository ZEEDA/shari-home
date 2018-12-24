$(document).ready(function () {
    var url             = $('#url').val();
    var current_country = $('input[name="current_country"]').val();
    var current_state   = $('input[name="current_state"]').val();
    var current_city    = $('input[name="current_city"]').val();
    var country         = $('.country_id');
    var states          = $('.state_id');
    var cities          = $('.city_id');
    function loadGEOData(child,element,selected)
    {
        if(selected === undefined){
            selected = null;
        }

        $.ajax({
            url: url + '/geo/children/' + child,
            method: 'get',
            success: function (data) {
                element.prop('disabled', false);
                element.empty();
                var selection = true;
                for (var i = 0; i < data.length; i++)
                {
                    var optionItemHtml = "<option value='" + data[i]['id']+"'";
                    if (selected == data[i]['id'])
                    {
                        selection = false;
                        optionItemHtml += " selected";
                    }
                    element.append( optionItemHtml + ">"+data[i]['name']+"</option>");
                }
                element.prepend("<option value='empty'"+(selection ? ' selected' : '')+">من فضلك قم بالاختيار</option>");
            }
        });
    }
    if (country.val())
    {
        loadGEOData(country.val(),states,current_state);
    }
    if (current_state)
    {
        loadGEOData(current_state,cities,current_city);
    }
    country.change(function(event) {
        loadGEOData($(this).val(),states);
    });
    states.change(function(event) {
        loadGEOData($(this).val(),cities);
    });
});