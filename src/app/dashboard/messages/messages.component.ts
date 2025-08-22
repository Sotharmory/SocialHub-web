import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { Conversation, Message } from '../../../models/conversation.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  conversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  messages: Message[] = [];
  messageForm: FormGroup;
  loading = false;
  sending = false;
  error = '';

  constructor(
    private messagesService: MessagesService,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.loadConversations();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  async loadConversations(): Promise<void> {
    try {
      this.loading = true;
      this.conversations = await this.messagesService.getConversations();
    } catch (error) {
      console.error('Error loading conversations:', error);
      this.error = 'Failed to load conversations';
    } finally {
      this.loading = false;
    }
  }

  async loadMessages(conversationId: string): Promise<void> {
    try {
      this.loading = true;
      this.messages = await this.messagesService.getMessages(conversationId);
      this.selectedConversation = this.conversations.find(c => c.id === conversationId) || null;
    } catch (error) {
      console.error('Error loading messages:', error);
      this.error = 'Failed to load messages';
    } finally {
      this.loading = false;
    }
  }

  /**
   * Enhanced message sending with validation
   */
  async sendMessageWithValidation(): Promise<void> {
    try {
      if (!this.messageForm.valid || !this.messageForm.get('content')?.value.trim()) {
        this.error = 'Please enter a message';
        return;
      }

      this.sending = true;
      const message = {
        content: this.messageForm.get('content')?.value.trim(),
        recipientId: this.selectedConversation?.participantId,
        conversationId: this.selectedConversation?.id
      };

      const result = await this.messagesService.sendMessage(message);
      if (result.success) {
        this.messageForm.reset();
        this.loadMessages(this.selectedConversation?.id);
        this.scrollToBottom();
      } else {
        this.error = result.message || 'Failed to send message';
      }
    } catch (error) {
      console.error('Send message error:', error);
      this.error = 'Failed to send message';
    } finally {
      this.sending = false;
    }
  }

  /**
   * Mark conversation as read
   */
  async markAsRead(conversationId: string): Promise<void> {
    try {
      await this.messagesService.markAsRead(conversationId);
      this.loadConversations();
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  }

  /**
   * Delete message
   */
  async deleteMessage(messageId: string): Promise<void> {
    try {
      const result = await this.messagesService.deleteMessage(messageId);
      if (result.success) {
        this.loadMessages(this.selectedConversation?.id);
      } else {
        this.error = result.message || 'Failed to delete message';
      }
    } catch (error) {
      console.error('Delete message error:', error);
      this.error = 'Failed to delete message';
    }
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.sendMessageWithValidation();
    }
  }
}

