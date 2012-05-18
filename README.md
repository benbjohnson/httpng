httpng - A local server for snapshotting HTML elements
======================================================

## DESCRIPTION

Httpng is a local server that you can run if you want to use HTML5 & CSS3 to
design but you want to export the page elements as PNGs. The server uses the
[html2canvas]([http://html2canvas.hertzen.com/]) library to render the elements
on the screen. Please see the limitations section of this README for more
information about what can and cannot be rendered.

Httpng follows the rules of [Semantic Versioning](http://semver.org/).


## INSTALLATION

You can install httpng with RubyGems:

    $ gem install httpng


## RUNNING

To run httpng, simply change directories to where your HTML file resides and
run the following command:

    $ httpng

This will run a web server at `localhost:7020`. You can change the port
by setting the `--port` or `-p` option on the command line. When opening the
web page in your browser, be sure to add the file name after the host and port.
For example, if your file name is `my_page.html` then open up
`http://localhost:7020/my_page.html` and not just `http://localhost:7020/`.


## EXPORTING

The server automatically inserts the JavaScript tags required for httpng to work
so just make sure your file includes `<HTML>` or `<HEAD>` and the file extension
is `html`.

When you load your page then you should see a bar at the top that gives you a
button to export your images.

To mark HTML elements for export, simply add a `data-export="<name>"` tag to the
element like this:

    <div style="border:1px solid black;" data-export="my_file">
      <!-- More code here... -->
    </div>

When you export your images, this `DIV` will be exported as `my_file.png` in
your output directory.


## Output Directory

By default, `httpng` will export your files to the `httpng-output/` directory
relative to when you started the command from. To change the output directory,
simply use the `--output` or `-o` arguments on the command line:

    $ httpng -o /path/to/my_output_dir


## Limitations

There are a few limitations with HTTPNG:

1. Text directly in the exported element will not render. For example, placing
   text in a DIV (`<div>foo</div>`) will not render but putting the text in a
   span or p will work: `<div><span>foo</span></div>`

1. Any limitation of the html2canvas library:
   [http://html2canvas.hertzen.com/](http://html2canvas.hertzen.com/).