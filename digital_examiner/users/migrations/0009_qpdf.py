# Generated by Django 3.1 on 2021-05-10 16:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_institute'),
    ]

    operations = [
        migrations.CreateModel(
            name='QPDF',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=200)),
                ('pdf', models.FileField(upload_to='pdfs')),
                ('date_time', models.DateTimeField(auto_now_add=True)),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.subject')),
            ],
        ),
    ]
