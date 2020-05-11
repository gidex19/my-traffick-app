from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'traffickapp/index.html')

def about(request):
    return render(request, 'traffickapp/about.html')

def start(request):
    return render(request, 'traffickapp/start.html')

def parameters(request):
    return render(request, 'traffickapp/parameters.html')

def parameters2(request):
    return render(request, 'traffickapp/parameters2.html')

