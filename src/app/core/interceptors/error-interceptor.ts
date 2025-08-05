import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Message} from "../../models/message";

export enum STATUS {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly router = inject(Router);
  private readonly toast = inject(ToastrService);

  private readonly errorPages = [STATUS.FORBIDDEN, STATUS.NOT_FOUND, STATUS.INTERNAL_SERVER_ERROR];

  private getMessage = (error: HttpErrorResponse) : Message => {
    const message: Message = new Message();
    if (error.error instanceof ErrorEvent) {
      message.title = 'An unexpected error occurred.';
      message.description = error.error.message || 'Error de red o del cliente.';

    } else {
      message.title = `Error ${error.status}` || 'Server Error';
      message.description = error.error?.detail || error.message || 'Ha ocurrido un error desconocido.';
    }

    return message;
  };

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (this.errorPages.includes(error.status)) {
      this.router.navigateByUrl(`/${error.status}`, {skipLocationChange: true,});
    } else {
      const message: Message = this.getMessage(error);
      this.toast.error(message.description, message.title);
      if (error.status === STATUS.UNAUTHORIZED) {
        this.router.navigateByUrl('/auth/login');
      }
    }

    return throwError(() => error);
  }
}
