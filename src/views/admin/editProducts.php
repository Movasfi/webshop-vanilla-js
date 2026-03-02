<?php

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/style.css" rel="stylesheet" />
    <title>Edit Product Page</title>
</head>

<body class="h-screen w-full">
    <?php
    require_once __DIR__ . ('/../../../components/navbar.php');
    ?>

    <div class="pt-30 mx-auto max-w-7xl">
        <div class="bg-strong-red w-fit p-3 rounded-2xl text-white">
            <a href="index.php" class="">Ga terug</a>
        </div>
        <h1 class="font-semibold text-5xl py-5">Edit Product</h1>
        <div>
            <form action="" method="post">
                <div class="mt-4">
                    <label for="naam">Naam</label>
                    <input type="text" name="" value="" id="naam-edit"
                        class="outline-none border border-black p-1 w-full rounded-xl">
                </div>
                <div class="mt-4">
                    <label for="prijs">Prijs</label>
                    <input type="tel" name="" value="" id="prijs-edit"
                        class="outline-none border border-black p-1 w-full rounded-xl">
                </div>
                <div class="mt-4">
                    <label for="image">Afbeelding</label>
                    <div class="flex gap-5">
                        <input type="text" name="" id="image-edit"
                            class="outline-none border border-black p-1 w-full rounded-xl">
                        <button type="button" id="preview-edit"
                            class="p-3 bg-strong-red rounded-2xl text-white">Preview</button>
                    </div>
                </div>
                <div id="preview-img-edit">

                </div>
                <button type="button" id="save-edit" class="text-white  bg-strong-red p-3 rounded-2xl mt-4">Voeg
                    Toe</button>
            </form>
        </div>
    </div>

    <script src="../clothes.js"></script>
</body>

</html>