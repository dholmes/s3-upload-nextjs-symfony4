<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Aws\S3\S3Client;

class UploadController extends AbstractController
{
  /**
  * @Route("/upload", name="upload", methods="POST")
  */
  public function upload(Request $request, S3Client $s3Client)
  {
    try {
      $cmd = $s3Client->getCommand('PutObject', [
          'Bucket' => $this->getParameter('app.s3.bucket.demo'),
          'ACL' => 'public-read',
          'Key' => $request->request->get('name'),
          'ContentType' => $request->request->get('type'),
      ]);

      $signedRequest = $s3Client->createPresignedRequest($cmd, '+20 minutes');

      $response = new JsonResponse([
          'signedUrl' => (string) $signedRequest->getUri(),
          'imageUrl' => sprintf("https://%s.s3.amazonaws.com/%s", 
              $this->getParameter('app.s3.bucket.demo'),
              $request->request->get('name')
          )
      ], Response::HTTP_OK);

      return $response;

    } catch (\Exception $exception) {
        
      return new JsonResponse([
          'success' => false,
          'code'    => $exception->getCode(),
          'message' => $exception->getMessage(),
      ], Response::HTTP_SERVICE_UNAVAILABLE);
    }
  }
}