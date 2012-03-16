httpng - A local server for snapshotting HTML elements
======================================================

## DESCRIPTION

Httpng is a local server that you can run if you want to use HTML5 & CSS3 to
design but you want to export the page elements as PNGs.

Httpng follows the rules of [Semantic Versioning](http://semver.org/).


## INSTALLATION

You can install httpng with RubyGems:

    $ gem install httpng


## RUNNING

To run httpng, simply change directories to where your HTML file resides and
run the following command:

    $ httpng

This will run a web server at `http://localhost:7020`. You can change the port
by setting the `--port` or `-p` option on the command line.


## EXPORTING

Once your server is running, simple add the following code to your HTML page in
the <head> tag:

    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
    <script src="/httpng.js"></script>

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

