import socket
import pygame
pygame.init()

# set up the drawing window
screen = pygame.display.set_mode([600, 600])

font_size = 36
# Create a font object
font = pygame.font.Font(None, font_size)

UDP_IP = "172.27.97.46"
UDP_PORT = 8092

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.bind((UDP_IP, UDP_PORT))

while True:
    data, addr = sock.recvfrom(1024)
    data_int = int(data)
    # print (data)
    # When you use data.decode('ASCII') to convert a bytes object (such as what you receive from a socket) into a string, it removes the b prefix and quotes around the data.
    # print ("Message: ", data.decode("ASCII"))

    font_size = int(data_int/2)

    screen.fill((0,0,0))
        
    # Create a text surface
    text = font.render("LIGHT", True, (248, 226, 0))

    # Get the rectangle of the text surface
    text_rect = text.get_rect()

    # Center the text on the screen
    text_rect.center = (300, 300)

    # Draw the text on the screen
    screen.blit(text, text_rect)

    # Update the display
    pygame.display.flip()

    # Update the font with the new size
    font = pygame.font.Font(None, font_size)

    # flip the display
    pygame.display.flip()

pygame.quit()
