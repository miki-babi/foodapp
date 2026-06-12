<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle($request = Illuminate\Http\Request::create('/me', 'GET'));

echo "STATUS: " . $response->status() . "\n";
if ($response->status() >= 400 || $response->status() == 302) {
    echo "REDIRECT: " . $response->headers->get('Location') . "\n";
    if ($response->exception) {
        echo "EXCEPTION: " . $response->exception->getMessage() . "\n";
        echo "TRACE:\n" . $response->exception->getTraceAsString() . "\n";
    } else {
        echo "CONTENT: " . substr($response->content(), 0, 500) . "\n";
    }
}
$kernel->terminate($request, $response);
