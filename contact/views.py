from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def contact_view(request):
    if request.method == 'POST':
        # If using AJAX (like our current theme.js)
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            full_name = data.get('full_name')
            email = data.get('email')
            message = data.get('message')
        else:
            # If using regular form submission
            full_name = request.POST.get('full_name')
            email = request.POST.get('email')
            message = data = request.POST.get('message')

        # Construct the email
        subject = f"New Portfolio Message from {full_name}"
        email_message = f"Name: {full_name}\nEmail: {email}\n\nMessage:\n{message}"
        
        try:
            send_mail(
                subject,
                email_message,
                settings.EMAIL_HOST_USER, # From
                [settings.EMAIL_HOST_USER], # To (Owner)
                fail_silently=False,
            )
            return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
