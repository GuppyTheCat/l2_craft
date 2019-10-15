<div class="container">
    <?php include("php_templates/jumbotron.php"); ?>
    <div class="row">
        <?php include("php_templates/navbar_tag.php"); ?>
        <?php include("php_templates/" . substr_replace(basename($_SERVER['PHP_SELF']), "", -4) . "_contents.php"); ?>
    </div>
</div>
<script src="../l2_craft/js/script.js"></script>