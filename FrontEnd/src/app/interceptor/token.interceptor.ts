import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req);

};