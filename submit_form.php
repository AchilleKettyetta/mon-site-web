<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Vous pouvez ajouter ici le code pour enregistrer les données ou envoyer un email
    // Exemple d'envoi d'email :
    $to = "votre.email@example.com"; // Remplacez par votre adresse email
    $subject = "Nouveau message de $name";
    $body = "Nom: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Merci pour votre message !";
    } else {
        echo "Une erreur est survenue. Veuillez réessayer.";
    }
}
?>