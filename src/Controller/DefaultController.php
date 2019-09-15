<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
  /**
  * @Route("/", name="")
  */
  public function index()
  {
    $response = new JsonResponse([
            "message" => "Hi there!  You found the PHP Backend"
    ]);
    return $response;
  }
}