<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
  /**
   * Register a new user.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function register(Request $request)
  {
      $incomingFields = $request->validate([
          'name' => 'required',
          'email' => ['required', 'email'],
          'password' => ['required', 'min:8'],
      ]);

      $incomingFields['password'] = bcrypt($incomingFields['password']);
      $user = User::create($incomingFields);

      $token = auth()->login($user);

      return $this->respondWithToken($token);
  }

  /**
   * Log in the user and generate a JWT token.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(Request $request)
  {
      $credentials = $request->validate([
          'email' => ['required', 'email'],
          'password' => ['required', 'min:8'],
      ]);

      if (!auth()->attempt($credentials)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
      }
      

      $token = auth()->attempt($credentials);

      return $this->respondWithToken($token);
  }

  /**
   * Log out the user (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout()
  {
      auth()->logout();

      return response()->json(['message' => 'Successfully logged out']);
  }

  /**
   * Get the authenticated User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function me()
  {
      return response()->json(auth()->user());
  }

  /**
   * Refresh a token.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function refresh()
  {
      return $this->respondWithToken(auth()->refresh());
  }

  /**
   * Delete the authenticated user.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\JsonResponse
   */
  public function delete(Request $request)
  {
    $user = Auth::user();

    if (auth()->user()->id !== $user->id) {
      return response()->json(['message' => 'Unauthorized'], 401);
    }

    $user->delete();

    return response()->json(['message' => 'Your account has been successfully deleted!']);
  }

  /**
   * Get the token array structure.
   *
   * @param  string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  protected function respondWithToken($token)
  {
      return response()->json([
          'access_token' => $token,
          'token_type' => 'bearer',
          'expires_in' => auth()->factory()->getTTL() * 60,
      ]);
  }
};