// Preload html2canvas.
document.write('<script src="/html2canvas.js"></script>');
document.write('<script src="/jquery.plugin.html2canvas.js"></script>');

// HTTPNG Namespace.
Httpng = {
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR:   'error',
    
    // Send all elements marked for export to server.
    export: function() {
        // Build queue of all elements.
        var queue = [];
        $.each($('[data-export]'), function(index, elem) {
            queue.push({status:Httpng.PENDING, element:elem});
        });
        
        // Begin processing the queue.
        Httpng.process(queue);
    },
    
    // Saves the next element in a queue.
    process: function(queue) {
        var stats = Httpng.getQueueStats(queue);
        
        // Execute html2canvas on next pending item.
        if(stats.next != null) {
            var item = stats.next;
            var element = item.element;
            var name = $(element).data('export');
            
            $(element).html2canvas({
                onrendered: function(canvas) {
                    var data = canvas.toDataURL('image/png');
                    data = data.replace(/^data:image\/png;base64,/, '');

                    $.post(
                        '/export',
                        {name:name, data:data}
                    )
                    .complete(function() {
                        item.status = Httpng.SUCCESS;
                        Httpng.process(queue);
                    })
                    .error(function() {
                        item.status = Httpng.ERROR;
                        Httpng.process(queue);
                    });
                }
            });
        }
        
        // If no more items are pending then show status message.
        else {
            if(stats.error == 0) {
                alert("OK: " + stats.success + " element" + (stats.success == 1 ? '' : 's' ) + " saved.");
            }
            else {
                alert("Unable to save " + stats.error + " elements.");
            }
        }
    },
    
    // Calculates stats on the queue include pending/success/error count and
    // next pending item.
    getQueueStats: function(queue) {
        var stats = {pending:0, success:0, error:0, next:null};
        
        for(var i in queue) {
            var item = queue[i];
            
            switch(item.status) {
                case Httpng.PENDING:
                    stats.pending++;
                    
                    if(stats.next == null) {
                        stats.next = item;
                    }
                    break;
                    
                case Httpng.SUCCESS: stats.success++; break;
                case Httpng.ERROR: stats.error++; break;
            };
        }
        
        return stats;
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

