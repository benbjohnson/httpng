// Preload html2canvas.
document.write('<script src="/html2canvas.js"></script>');
document.write('<script src="/jquery.plugin.html2canvas.js"></script>');

// HTTPNG Namespace.
Httpng = {
    // Send all elements marked for export to server.
    export: function() {
        var elements = $('[data-export]');
        
        // Create a function to show success after all elements returned.
        var totalCount = elements.length;
        var completedCount = 0;
        var errors = [];
        var showComplete = function() {
            if(completedCount >= totalCount) {
                // Show errors if present.
                if(errors.length > 0) {
                    alert(errors.join("\n"));
                }
                // Otherwise show success.
                else {
                    alert('OK: ' + completedCount + ' element' + (completedCount == 1 ? '' : 's' ) + ' saved.')
                }
            }
        };
        
        // Loop over elements and save.
        $.each(elements, function(index, element) {
            var name = $(element).data('export');
            
            $(element).html2canvas({
                onrendered: function(canvas) {
                    var data = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');

                    $.post(
                        '/export',
                        {name:name, data:data}
                    )
                    .complete(function() {
                        completedCount++;
                        showComplete()
                    })
                    .error(function() {
                        completedCount++;
                        errors.push('Unable to save: ' + name);
                        showComplete();
                    });
                }
            })
        });
    }
};

// Setup HTTPNG UI.
$(document).ready(function() {
    // Add top bar.
    $(document).find('body')
        .prepend('<div id="httpng-bar" style="background-color:#000000; margin-bottom:20px; text-align:right;"><button id="httpng-export">Export</button></div>');
    
    // Add listener to export button.
    $(document).find('#httpng-export').click(function(event) {
        Httpng.export();
    });
});

